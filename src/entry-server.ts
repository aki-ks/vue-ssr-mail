import { createApp, SSRContext } from './main'

export default (context: SSRContext) => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context);

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (matchedComponents.length) {
        resolve(app)
      } else {
        reject(new Error(`No such route '${context.url}'`))
      }
    }, reject)
  })
}
