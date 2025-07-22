package com.example.demo.service.impl;

import com.example.demo.repository.*;
import com.jcraft.jsch.JSchException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.service.SSHService;
import com.example.demo.entity.*;
import com.example.demo.config.SshConfig;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class SSHServiceImpl implements SSHService {

    @Autowired
    private final SshConfig sshConfig;
    private  final DomainLogRepository domainLogRepository;
    private final BlockedDomainRepository blockedDomainRepository;

    public Session connect() throws JSchException {
        Session session = null;
        JSch jsch = new JSch();// SSH bağlantısı olusturulur
        jsch.addIdentity(sshConfig.getPrivateKeyPath());
        session = jsch.getSession(sshConfig.getUsername(), sshConfig.getHostIp(), sshConfig.getPort());
        session.setConfig("StrictHostKeyChecking", "no"); //sunucuya ilk baglantına onay istememesi için
        session.setConfig("PreferredAuthentications", "publickey");
        session.connect();
        log.warn("[*] Bağlantı Sağlandı!");
        return session;
    }

    @Transactional
    public BlockedDomain blockDomainsOverSSH(String domains) throws JSchException {
        String actionMessage, actionStatus = "";
        BlockedDomain domain = null;
        Session session = null;
        try {
            session = connect();
            String checkCmd = "grep \"" + domains + "\" /etc/hosts";
            String addCmd = "echo \"127.0.0.1 " + domains + "\" | sudo tee -a /etc/hosts > /dev/null";

            if (!commandExists(session, checkCmd)) { //domain zaten var mı yok mu kotnrol ettik yoksa devam
                executeCommand(session, addCmd);
                domain = new BlockedDomain(domains, "admin", LocalDateTime.now());
                blockedDomainRepository.save(domain);
            } else {
                log.info(domains + " zaten mevcut.");
                actionMessage = "[SSH Service] Domain " + domains + " already exists.";
                actionStatus = "ALREADY_EXISTS";
                domain = blockedDomainRepository.findByDomainName(domains);

                if (domain != null) {
                    DomainLog actionlog = domainlogger(domain, domains, "BLOCK", actionStatus, actionMessage, "Admin");
                    domain.addActionLog(actionlog);
                    domainLogRepository.save(actionlog);
                } else {
                    throw new JSchException(actionMessage);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("[*] SSH bağlantı hatası: " + e.getMessage());
        } finally {
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
        return domain;
    }

    public DomainLog domainlogger(BlockedDomain domain, String domain_name, String actionType, String actionStatus, String actionMessage, String actedBy) {
        return new DomainLog(domain, domain_name, actionType, actionStatus, actionMessage, actedBy);
    }

    //shell exec sftp subsystem
    @Transactional
    public BlockedDomain unBlockDomainsOverSSH(String domain) {
        Session session = null;
        String actionMessage, actionStatus = "";
        BlockedDomain blockedDomain = null;
        try {
            session = connect();
            blockedDomain = blockedDomainRepository.findByDomainName(domain);
            if (blockedDomain == null) {
                throw new IllegalArgumentException("Domain '" + domain + "' is not found in the database.");
            }
            String checkCmd = "grep \"" + domain + "\" /etc/hosts";
            String removeCmd = "sh -c \"sudo sed -i '/127\\.0\\.0\\.1 " + domain + "/d' /etc/hosts\"";
            if (commandExists(session, checkCmd)) {  // domain var mı?
                executeCommand(session, removeCmd);
                actionMessage = "[SSH Service] Domain succesfully removed from etc/hosts";
                actionStatus = "SUCCES";
                log.info("[*] " + domain + " kaldırıldı.");
            } else {
                actionMessage = "[SSH Service] Domain not Found in /etc/hosts.";
                actionStatus = "FAILED";
                log.info("[*] " + domain + " zaten mevcut değil.");
            }
            DomainLog actionLog = domainlogger(blockedDomain, domain, "UNBLOCK", actionStatus, actionMessage, "Admin");
            blockedDomain.addActionLog(actionLog);
            domainLogRepository.save(actionLog);

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        } finally {
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
        return blockedDomain;
    }

    private boolean commandExists(Session session, String command) throws Exception {
        ChannelExec channel = (ChannelExec) session.openChannel("exec"); //exec tipi komut satırı actk (tek komutluk terminal) | acılan chanel türünü channelexec yaptk
        channel.setCommand(command);
        channel.setErrStream(System.err);
        channel.connect();
        while (channel.getExitStatus() == -1) {
            Thread.sleep(100);
        } // komut bitmeden disconnect yaparsak -1 dönme ihtimali var(false)
        int exitStatus = channel.getExitStatus();
        channel.disconnect();
        return exitStatus == 0;
    }

    private void executeCommand(Session session, String command) throws Exception {
        ChannelExec channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);
        channel.setErrStream(System.err);
        channel.connect(); //kanal aktif hale gelir komut calıstı
        channel.disconnect();
    }
}