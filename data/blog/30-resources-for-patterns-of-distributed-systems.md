---
title: '30 essential design patterns for distributed systems'
date: '2024-09-02'
tags: ['soft-ware architecture', 'destributed systems', 'notes']
draft: false
summary: 'Distributed systems are complex, requiring careful planning and design to handle challenges like data consistency, fault tolerance, and scalability. Below are 30 essential patterns in distributed systems'
---

# Overview
Distributed systems are complex, requiring careful planning and design to handle challenges like data consistency, fault tolerance, and scalability. Below are 30 essential patterns in distributed systems

- [**Clock-Bound Wait**](https://martinfowler.com/articles/patterns-of-distributed-systems/clock-bound-wait.html)
    - **Summary**: Handles time synchronization across cluster nodes to ensure values are correctly ordered when reading and writing data.
- [**Consistent Core**](https://martinfowler.com/articles/patterns-of-distributed-systems/consistent-core.html)
    - **Summary**: Maintains a smaller cluster with stronger consistency to coordinate activities in a larger data cluster without needing quorum-based algorithms.
- [**Emergent Leader**](https://martinfowler.com/articles/patterns-of-distributed-systems/emergent-leader.html)
    - **Summary**: Allows nodes to select a leader without running an explicit election by ordering cluster nodes based on their age within the cluster.
- [**Fixed Partitions**](https://martinfowler.com/articles/patterns-of-distributed-systems/fixed-partitions.html)
    - **Summary**: Keeps the number of partitions fixed to prevent the mapping of data to partitions from changing when the cluster size changes.
- [**Follower Reads**](https://martinfowler.com/articles/patterns-of-distributed-systems/follower-reads.html)
    - **Summary**: Improves throughput and reduces latency by serving read requests from follower nodes rather than the leader.
- [**Generation Clock**](https://martinfowler.com/articles/patterns-of-distributed-systems/generation-clock.html)
    - **Summary**: Uses a monotonically increasing number to indicate the generation of a server, helping to maintain order and consistency.
- [**Gossip Dissemination**](https://martinfowler.com/articles/patterns-of-distributed-systems/gossip-dissemination.html)
    - **Summary**: Ensures information reaches all nodes in a cluster by using a random selection of nodes to pass on information, avoiding network flooding.
- [**HeartBeat**](https://martinfowler.com/articles/patterns-of-distributed-systems/heartbeat.html)
    - **Summary**: Periodically sends messages to all other servers to show that a server is available, helping to detect failures.
- [**High-Water Mark**](https://martinfowler.com/articles/patterns-of-distributed-systems/high-watermark.html)
    - **Summary**: An index in the write-ahead log that shows the last successful replication, ensuring that data is consistently replicated.
- [**Hybrid Clock**](https://martinfowler.com/articles/patterns-of-distributed-systems/hybrid-clock.html)
    - **Summary**: Combines system and logical timestamps to have versions as date and time, which can be ordered across distributed systems.
- [**Idempotent Receiver**](https://martinfowler.com/articles/patterns-of-distributed-systems/idempotent-receiver.html)
    - **Summary**: Ensures that duplicate client requests are safely ignored by uniquely identifying each request, preventing unintended side effects.
- [**Key-Range Partitions**](https://martinfowler.com/articles/patterns-of-distributed-systems/key-range-partitions.html)
    - **Summary**: Partitions data into sorted key ranges to efficiently handle range queries and balance the load across nodes.
- [**Lamport Clock**](https://martinfowler.com/articles/patterns-of-distributed-systems/lamport-clock.html)
    - **Summary**: Uses logical timestamps as versions for values, allowing for the correct ordering of values across distributed servers.
- [**Leader and Followers**](https://martinfowler.com/articles/patterns-of-distributed-systems/leader-follower.html)
    - **Summary**: A single server coordinates replication across a set of follower servers, ensuring consistent state across the cluster.
- [**Lease**](https://martinfowler.com/articles/patterns-of-distributed-systems/lease.html)
    - **Summary**: Uses time-bound leases to coordinate activities between cluster nodes, ensuring that resources are managed efficiently.
- [**Low-Water Mark**](https://martinfowler.com/articles/patterns-of-distributed-systems/low-watermark.html)
    - **Summary**: An index in the write-ahead log showing which portion of the log can be safely discarded, optimizing storage usage.
- [**Majority Quorum**](https://martinfowler.com/articles/patterns-of-distributed-systems/majority-quorum.html)
    - **Summary**: Prevents independent decisions by different server groups by requiring a majority quorum for all decisions, ensuring consistency.
- [**Paxos**](https://martinfowler.com/articles/patterns-of-distributed-systems/paxos.html)
    - **Summary**: A consensus algorithm that ensures safe consensus even when nodes disconnect, critical for maintaining a consistent state.
- [**Replicated Log**](https://martinfowler.com/articles/patterns-of-distributed-systems/replicated-log.html)
    - **Summary**: Keeps the state of multiple nodes synchronized using a write-ahead log that is replicated across all cluster nodes.
- [**Request Batch**](https://martinfowler.com/articles/patterns-of-distributed-systems/request-batch.html)
    - **Summary**: Combines multiple requests into a single batch to optimally utilize the network, reducing overhead and improving efficiency.
- [**Request Pipeline**](https://martinfowler.com/articles/patterns-of-distributed-systems/request-pipeline.html)
    - **Summary**: Improves latency by allowing multiple requests to be sent on a connection without waiting for the previous request’s response.
- [**Request Waiting List**](https://martinfowler.com/articles/patterns-of-distributed-systems/request-waiting-list.html)
    - **Summary**: Tracks client requests that require responses based on criteria met by responses from other cluster nodes.
- [**Segmented Log**](https://martinfowler.com/articles/patterns-of-distributed-systems/segmented-log.html)
    - **Summary**: Splits the log into multiple smaller files instead of a single large file, making operations easier and more efficient.
- [**Single-Socket Channel**](https://martinfowler.com/articles/patterns-of-distributed-systems/single-socket-channel.html)
    - **Summary**: Maintains the order of requests sent to a server by using a single TCP connection, preventing out-of-order processing.
- [**Singular Update Queue**](https://martinfowler.com/articles/patterns-of-distributed-systems/singular-update-queue.html)
    - **Summary**: Processes requests asynchronously using a single thread to maintain order without blocking the caller.
- [**State Watch**](https://martinfowler.com/articles/patterns-of-distributed-systems/state-watch.html)
    - **Summary**: Notifies clients when specific values change on the server, ensuring clients are aware of important state changes.
- [**Two-Phase Commit**](https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-commit.html)
    - **Summary**: A protocol that updates resources on multiple nodes in one atomic operation, ensuring consistency across distributed systems.
- [**Version Vector**](https://martinfowler.com/articles/patterns-of-distributed-systems/version-vector.html)
    - **Summary**: Maintains a list of counters, one per cluster node, to detect concurrent updates and resolve conflicts in distributed data.
- [**Versioned Value**](https://martinfowler.com/articles/patterns-of-distributed-systems/versioned-value.html)
    - **Summary**: Stores every update to a value with a new version, allowing for the retrieval of historical values when necessary.
- [**Write-Ahead Log**](https://martinfowler.com/articles/patterns-of-distributed-systems/write-ahead-log.html)
    - **Summary**: Provides durability guarantees by persisting every state change as a command to an append-only log, even before data structures are flushed to disk.
