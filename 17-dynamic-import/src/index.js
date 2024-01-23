// import posts from './posts/posts'
// import album from './album/album'

const { default: album } = require('./album/album')

const render = () => {
  const hash = window.location.hash || '#posts'

  const mainElement = document.querySelector('.main')

  mainElement.innerHTML = ''

  if (hash === '#posts') {
    //动态导入
    import(/*webpackChunkName: 'post' */  './posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })
    // mainElement.appendChild(posts())
  } else if (hash === '#album') {
    // mainElement.appendChild(album())
    //  通过注释 可以更改bundle的包名
    import(/*webpackChunkName: 'album' */ './album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }
}

render()

window.addEventListener('hashchange', render)
