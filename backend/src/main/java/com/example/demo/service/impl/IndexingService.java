package com.example.demo.service.impl;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Configuration // conf oldugundan uyg basında yuklenır
public class IndexingService implements ApplicationListener<ContextRefreshedEvent> {

    private final EntityManager entityManager;

    @Autowired
    public IndexingService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void onApplicationEvent(@NotNull ContextRefreshedEvent contextRefreshedEvent) {
        SearchSession searchSession = Search.session(entityManager);
        try {
            searchSession.massIndexer().idFetchSize(80).batchSizeToLoadObjects(15).threadsToLoadObjects(8).startAndWait();
        }
        catch (InterruptedException e) {
            log.error(e.getMessage());
            Thread.currentThread().interrupt();
        }
    }
}
