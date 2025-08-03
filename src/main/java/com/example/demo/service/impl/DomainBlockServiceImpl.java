package com.example.demo.service.impl;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.*;
import com.jcraft.jsch.JSchException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class DomainBlockServiceImpl implements DomainBlockService {

    private final BlockedDomainRepository blockedDomainRepository;
    private final SSHService sshService;
    private final DomainLogRepository domainActionLogRepository;

    @Autowired
    public DomainBlockServiceImpl(BlockedDomainRepository blockedDomainRepository, SSHService sshService, DomainLogRepository domainActionLogRepository) {
        this.blockedDomainRepository = blockedDomainRepository;
        this.sshService = sshService;
        this.domainActionLogRepository = domainActionLogRepository;
    }

    public DomainLog domainlogger(BlockedDomain domain, String domain_name, String actionType, String actionStatus, String actionMessage, String actedBy) {
        return new DomainLog(domain, domain_name, actionType, actionStatus, actionMessage, actedBy);
    }
    @Transactional
    @Override
    public void blockDomains(List<String> domains) throws JSchException {
        BlockedDomain blockedDomain= null;
        for (String domain : domains) {
            blockedDomain= sshService.blockDomainsOverSSH(domain);
            String actionMessage = "[SSH Service] Domain " + blockedDomain.getDomainName() + "successfully added to /etc/hosts and DB.";
            String actionStatus = "SUCCESS";
            DomainLog actionlog = domainlogger(blockedDomain, blockedDomain.domainName, "BLOCK", actionStatus, actionMessage, "Admin");
            blockedDomain.addActionLog(actionlog);
            domainActionLogRepository.save(actionlog);
            log.info(domain + " eklendi.");
        }
    }

    @Transactional
    @Override
    public void unblockDomains(List<String> domains) {
        for (String domain : domains) {
            sshService.unBlockDomainsOverSSH(domain);
            try {
                blockedDomainRepository.deleteByDomainName(domain);
                log.info("[*] Domain engellemesi DB'den kaldırıldı: " + domain);
            } catch (Exception e) {
                log.error("DB'den kaldırımadı: " + domain, e);            }
        }
    }

    // Engellenen domainleri listeleme
    @Override
    public List<BlockedDomain> getAllBlockedDomains() {
        return blockedDomainRepository.findAll();
    }
}