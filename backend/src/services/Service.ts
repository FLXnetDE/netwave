interface Service {
    start(): Promise<void> | void;
    stop(): Promise<void> | void;
}

export default Service;
