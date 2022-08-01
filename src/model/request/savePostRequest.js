export const savePostRequest = (payload, content, upload) => {
    const data = {
        content: content,
        category_id: payload.category_id,
        title: payload.title,
        cover: upload[0]?.upload
    }

    return data;
}