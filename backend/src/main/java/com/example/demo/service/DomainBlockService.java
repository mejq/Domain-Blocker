package com.example.demo.service;
import com.example.demo.entity.BlockedDomain;
import com.jcraft.jsch.JSchException;
import java.util.List;



public interface DomainBlockService {
    void blockDomains(List<String> domains) throws JSchException;
    void unblockDomains(List<String> domains);
    List<BlockedDomain> getAllBlockedDomains();
}

