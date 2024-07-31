package com.mine.application.common.domain;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 3600) // default 값 : 1800
public class SessionConfig {
    //TODO : ClusterTopology 설정 필요

    /**
     * <h2>Lettuce vs Jedis ?</h2>
     * <p>
     *     Lettuce와 Jedis는 모두 유명한 Redis Client 오픈 소스인데, 현재 Spring 에서는 Default로 Lettuce를 사용하고 있음.
     * </p>
     * <p>
     *     Jedis의 경우, 멀티 쓰레드 환경에서 하나의 Jedis 인스턴스를 공유하고 싶을 때, 쓰레드 안전성을 보장하지 않음. 멀티 스레드 환경에서 Polling 연결 방식을 사용함.
     *     Jedis를 사용하는 각 동시성을 지닌 스레드는 Jedisrㅏ 상호 작용하는 동안 자체 Jedis 인스턴스를 가져옴. 이는 Redis 연결이 증가하여 Jedis 인스턴스가 늘어날 때마다
     *     물리적인 연결 비용이 발생함.
     * </p>
     * <p>
     *     Lettuce는 netty 기반으로 멀티 스레드 환경에서 상태를 가지고 공유될 수 있음. 따라서 멀티 쓰레드 어플리케이션이 Letuce와 상호 작용하는 동시성을 가진 쓰레드의 개수와
     *     상관없이 하나의 연결만을 사용하면됨.
     *     대신, <a href='https://docs.google.com/presentation/d/1FtEFBCubpcqMJ6C7YV55KAxjhZ5znYn6A3f1c341Lcg/edit#slide=id.p'>ClusterTopology</a>를 설정해야 함.
     *
     * </p>
     */

}