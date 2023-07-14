const Globals = {
    get baseUrl() {
        if (!this.__url) {
            let url = window.ApiUrl || ''
            if (url && !url.endsWith('/')) url = url + '/'
            this.__url = url
        }
        return this.__url
    },

    toURL: function (path:any, params:any, useBaseUrl = true) {
        if (path[0] === '/') path = path.substring(1)

        if (params) {
            if (path[path.length] !== '?') path += '?'

            let parrs = []
            for (let key in params) {
                let val = params[key]
                if (Array.isArray(val)) {
                    for (let i = 0; i < val.length; i++) {
                        parrs.push(`${key}=${val[i]}`)
                    }
                } else {
                    parrs.push(`${key}=${val}`)
                }
            }

            path += parrs.join('&')
        }

        return useBaseUrl ? this.baseUrl + path : path
    },
}

export default Globals
