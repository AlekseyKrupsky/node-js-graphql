export type microserviceEntity = {
    _id: string,
    [key: string]: any
}

export type newEntity = {
    [key: string]: any
}

export type defaultEntity = {
    id: string,
    [key: string]: any
}

export type fullEntity = defaultEntity | microserviceEntity;