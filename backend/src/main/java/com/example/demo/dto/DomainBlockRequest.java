package com.example.demo.dto;
/*
DomainBlockRequest sınıfı, istemciden (örneğin Angular frontend'den) gelen bir HTTP isteğinde,
engellenecek domain listesini backend'e aktarmak için kullanılacak.
 */
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
public class DomainBlockRequest {
    private List<String> domains;
}
