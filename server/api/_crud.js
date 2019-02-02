function create(service, request, response) {
    service.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            results: result
        })
    })
}

function update(service, request, response) {
    service.update(request.params.id, request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            results: result
        })
    })
}

function fetch(service, request, response) {
    service.fetchAll(result => {
        response.json({
            success: result != null ? true : false,
            results: result
        })
    })
}

function fetchById(service, request, response) {
    service.fetchById(request.params.id, result => {
        response.json({
            success: result != null ? true : false,
            results: result
        })
    })
}

export default { create, update, fetch, fetchById }
