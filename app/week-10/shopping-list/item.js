
export default function Item({itemObj, onSelect}){

    let {name, quantity, category} = itemObj;
    const handelSelect = () => {
        onSelect(itemObj.name);
    }

    return(
            <div onClick={handelSelect}>
                <li className="bg-slate-800 p-4 mb-4 rounded-lg border border-cyan-50">
                    <h1 className="font-bold text-lg text-yellow-200">{name}</h1>
                    <p className="text-lg text-yellow-100">Buy {quantity} in {category}</p>
                </li>
            </div>
    );
}