// https://github.com/barbapapazes/nuxt-authorization
export default defineNuxtPlugin({
  name: "authorization-resolver",
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => {
            const { getSession} = useAuth()
                console.log(getSession());
          },
        },
      },
    };
  },
});
