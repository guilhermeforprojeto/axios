const statusEl = document.getElementById('status');
const dataEl = document.getElementById('data');
const headersEl = document.getElementById('headers');
const configEl = document.getElementById('config');

const get = () => {

    const config = {
        params: {
            _limit: 5
        }
    }

    axios.get('https://jsonplaceholder.typicode.com/posts', config)
        .then((response) => renderOutput(response))

    console.log('get');
}

const post = () => {
    
    const data = {
        
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    axios.post('https://jsonplaceholder.typicode.com/posts', data)
    .then((response) => renderOutput(response))

    console.log('post');
}

const put = () => {
    const data = {
        
        title: 'Lara',
        body: 'bar',
        userId: 1,
    }
    axios.put('https://jsonplaceholder.typicode.com/posts/1', data)
    .then((response) => renderOutput(response))
    console.log('put');
}

const patch = () => {

    const data = {
        
        title: 'Laranja',
    }
    // diferença é que por convenção o PUT atualiza tudo e o PATCH apenas uma linha
    axios.patch('https://jsonplaceholder.typicode.com/posts/1', data)
    .then((response) => renderOutput(response))
    console.log('patch');
}

const del = () => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/2', data)
    .then((response) => renderOutput(response))
    console.log('delete');
}

const multiple = () => {
    Promise.all( [
        axios.get('https://jsonplaceholder.typicode.com/posts?limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/users?limit=5')
    ]).then((response) => {
        console.table(response[0].data); 
        console.table(response[1].data); 
    });

}

const transform = () => {
    const config = {
        params: {
            _limit: 5
        },
        // Faz o que quiser para transformar os dados
        transformResponse: [function (data) {
            const payload = JSON.parse(data).map(o => {
                return {
                    title: o.title,
                    body: o.body,
                }            
            })
            return payload;
        }]
    }
    //Dessa forma a requisição vem pronta visto que dentro de config tem os parammetros  
    axios.get('https://jsonplaceholder.typicode.com/posts?', config)
        .then((response) => renderOutput(response))
}

const errorHandling = () => {
    console.log('errorHandling');
}

const cancel = () => {
    console.log('cancel');
}

const clear = () => {
    statusEl.innerHTML = '';
    statusEl.className = '';
    dataEl.innerHTML = '';
    headersEl.innerHTML = '';
    configEl.innerHTML = '';
}

const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute('class');
    let statusElClass = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium';
    if (status >= 500) {
        statusElClass += ' bg-red-100 text-red-800';
    } else if (status >= 400) {
        statusElClass += ' bg-yellow-100 text-yellow-800';
    } else if (status >= 200) {
        statusElClass += ' bg-green-100 text-green-800';
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
}

document.getElementById('get').addEventListener('click', get);
document.getElementById('post').addEventListener('click', post);
document.getElementById('put').addEventListener('click', put);
document.getElementById('patch').addEventListener('click', patch);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('multiple').addEventListener('click', multiple);
document.getElementById('transform').addEventListener('click', transform);
document.getElementById('cancel').addEventListener('click', cancel);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('clear').addEventListener('click', clear);
