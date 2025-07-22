package com.example.demo.repository;
import com.example.demo.entity.BlockedDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Repository
public interface BlockedDomainRepository extends JpaRepository<BlockedDomain, UUID> {
    @Transactional
    void deleteByDomainName(String domainName);
    BlockedDomain findByDomainName(String domainName);
}