type ParamsType = {
    id: string;
};
type PageProps = {
    params: Promise<ParamsType>;
};
export default async function PostDetail(props: PageProps) {
    const { id } = await props.params;
    //console.log(await props.params);
    return <div>{id}</div>;
}
