package com.example.demo.controller;

import java.util.List;
import com.example.demo.entity.BlockedDomain;
import com.example.demo.service.impl.SearchService;
import com.jcraft.jsch.JSchException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.dto.DomainBlockRequest;
import com.example.demo.service.impl.DomainBlockServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")  // frontend portun
@RestController // gelen requestleri json formatinda cevaplar
@RequestMapping("/api/domain-block") //classa gelecek isteklerin genel URL yapısını belirler
public class DomainBlockController {

    private final DomainBlockServiceImpl domainBlockService; // değiştirileyecek, domain blocklama işlerini yapacak
    private final SearchService searchService;

    @Autowired // Spring, DomainBlockService nesnesini otomatik olarak buraya enjekte eder
    public DomainBlockController(DomainBlockServiceImpl domainBlockService, SearchService searchService) { //contructor domainBlockserviele çalışıyor
        this.domainBlockService = domainBlockService;
        this.searchService = searchService;
    }

    @PostMapping // HTTP POST isteği ile /api/domain-block endpoint'ine yapılan çağrılar bu metoda gelir.
    public ResponseEntity<String> blockDomains(@RequestBody DomainBlockRequest request) throws JSchException {//İstek gövdesinden JSON formatında gelen domain listesi alınır ve DomainBlockRequest nesnesine çevrilir.
        log.info("post req backende geldi" + request);
        List<String> domainList = request.getDomains();
        domainBlockService.blockDomains(domainList); //Domain engelleme işlemi başlatılır.
        return ResponseEntity.ok("[*] Domain block request received"); // 200 OK cevabı döner, mesajla birlikte.
    }

    @GetMapping// HTTP GET ile /api/domain-block çağrıldığında çalışır.
    public ResponseEntity<List<BlockedDomain>> getBlockedDomains() {
        List<BlockedDomain> blockedDomainList = domainBlockService.getAllBlockedDomains();
        log.info("Blocked domains: " + blockedDomainList);
        return ResponseEntity.ok(blockedDomainList);
    }

    @GetMapping("/Search")
    public ResponseEntity<List<BlockedDomain>> searchBlockedDomains(@RequestParam String search) {
        log.info("search req backende geldi"+ search);
        List<BlockedDomain> domainList = searchService.searchBlockedDomain(search);
        log.warn(domainList.toString());
        return ResponseEntity.ok(domainList);
    }

    //HTTP DELETE isteği ile /api/domain-block endpoint’ine istek geldiğinde çalışır.
    @DeleteMapping("/delete/{domain}")
    public ResponseEntity<String> unblockDomain(@PathVariable String domain) {
        List<String> domainList = List.of(domain);  // Tek domain'den liste oluşturduk
        domainBlockService.unblockDomains(domainList);
        return ResponseEntity.ok("[*] Domain unblock request received for: " + domain);
    }
}
