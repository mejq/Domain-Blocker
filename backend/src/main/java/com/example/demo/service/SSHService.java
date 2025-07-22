package com.example.demo.service;
import com.example.demo.entity.BlockedDomain;
import com.jcraft.jsch.JSchException;
import org.springframework.transaction.annotation.Transactional;


public interface SSHService {
    /**
     * Domainleri SSH üzerinden engeller.
     * @param domains Engellenecek domain listesi
     * @return Gerçekten engellenmiş domainler (eklenenler)
     */
    @Transactional
    BlockedDomain blockDomainsOverSSH(String domains) throws JSchException;
    /**
     * Domainlerin engelini kaldırır.
     * @param domains Engel kaldırılacak domain listesi
     */
    @Transactional
    BlockedDomain unBlockDomainsOverSSH(String domains);
}
