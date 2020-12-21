import Picture from "./PictureComponent";


export default function PictureList() {

    const pictureLinkList: Array<string> = [
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1308&q=80",
        "https://images.unsplash.com/photo-1573551461515-4c44d140a829?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80",
        "https://images.unsplash.com/photo-1606895213385-e0a005ef801a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1512518463689-538edacd754d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
    ];

    const pictureList = pictureLinkList.map(link => (
        <Picture pictureLink={ link } description={ "bycicle" } width={ 150 } />
    ));

    return (
        <section>
            <div className="flex justify-center">
                { pictureList }
            </div>
            <div className="flex justify-between my-5">
                <input type="text" className="p-2 border border-gray-800 shadow rounded" />
                <button className="p-2 bg-green-600 text-white">Add picture</button>
            </div>
        </section>
    )
}