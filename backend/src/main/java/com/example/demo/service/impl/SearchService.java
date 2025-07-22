package com.example.demo.service.impl;

import com.example.demo.entity.BlockedDomain;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.mapper.orm.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service

public class SearchService {

    private final EntityManager entityManager;

    @Autowired
    public SearchService(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }
    @Transactional
    public List<BlockedDomain> searchBlockedDomain(String keyword) {
        log.warn("Searching for domains for {}", keyword);
        return Search.session(entityManager)
                .search(BlockedDomain.class)
                .where(f -> f.wildcard()
                        .field("domainName")
                        .matching(keyword.toLowerCase() + "*"))
                .fetchHits(15);
    }
}
