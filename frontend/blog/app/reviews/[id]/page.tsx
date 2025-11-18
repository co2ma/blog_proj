type ParamsType = {
    id: string;
};
type PageProps = {
    params: Promise<ParamsType>;
};
async function ReviewDetail(props: PageProps) {
    const { id } = await props.params;
    //console.log(await props.params);
    return <div>{id}</div>;
}

export default ReviewDetail;
