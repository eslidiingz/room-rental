export const context = ({ req }: { req: any }) => {
    console.log('req', req)

    return { req };
}