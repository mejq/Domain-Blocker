package com.example.demo.config;
import  org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import  org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import  org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import  org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import  org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AnalysisConfigurer  implements LuceneAnalysisConfigurer {
    @Override
    public void configure(LuceneAnalysisConfigurationContext luceneAnalysisConfigurationContext) {
        luceneAnalysisConfigurationContext.analyzer("english").custom()
                .tokenizer(StandardTokenizerFactory.class)
                .tokenFilter(LowerCaseFilterFactory.class) // kelimenin hepsını lowercase yaptık
                .tokenFilter(SnowballPorterFilterFactory.class) //eng kök bulma
                .param("language", "English")
                .tokenFilter(EdgeNGramFilterFactory.class) // 3-50 harf arası bölümlüyor tam kelime yazmaya grk yk
                .param("minGramSize", "3")
                .param("maxGramSize", "50");
    }
}
