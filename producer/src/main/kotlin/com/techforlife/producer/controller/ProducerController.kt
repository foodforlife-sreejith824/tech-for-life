package com.techforlife.producer.controller

import com.techforlife.producer.api.ProducerApi
import com.techforlife.producer.model.Producer
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1")
class ProducerController : ProducerApi {
    override fun getAllProducers(): ResponseEntity<List<Producer>> {
        return ResponseEntity.ok(listOf(
            Producer(1213, "Abcd")
        ))
    }
}