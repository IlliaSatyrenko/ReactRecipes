import { useRef } from "react";
import "./FilterCategory.css";

type Filter = {
    name: string;
    data: any;
    onChange: Function;
};

function FilterCategory({ name, data, onChange }: Filter) {
    let arr: string[] = [];

    const maxFilterHeight = useRef<any>();

    function onClick(name: string, target: string) {
        onChange(name, target);
    }

    if (data !== undefined && data[0]) {
        if (name === "Category") {
            for (let item of data) {
                if (arr.includes(item.strCategory)) continue;
                arr.push(item.strCategory);
            }
        }
        if (name === "Area") {
            for (let item of data) {
                if (arr.includes(item.strArea)) continue;
                arr.push(item.strArea);
            }
        }
        if (name === "Tags") {
            for (let item of data) {
                let currentTags: any[] = item.strTags?.split(",");
                for (let i = 0; i <= currentTags?.length; i++) {
                    let tag = currentTags[i];
                    if (tag === "" || tag === undefined) continue;
                    if (arr.includes(tag)) continue;
                    arr.push(tag);
                }
            }
        }
    }

    function toogleFilterItem() {
        if (window.innerWidth < 1200) {
            maxFilterHeight.current.style.maxHeight = maxFilterHeight.current.style.maxHeight === "0px" ? "1500px" : "0px";
        } else {
            maxFilterHeight.current.style.maxHeight = maxFilterHeight.current.style.maxHeight === "0px" ? "900px" : "0px";
        }
    }

    return (
        <div className="filter-category">
            <button className="category-button" onClick={() => toogleFilterItem()}>
                <span>{name}</span>
                <span className="category-arrow" />
            </button>
            <div className="category-options" style={{ maxHeight: "0px" }} ref={maxFilterHeight}>
                {arr.map((optName: string, index: number) => {
                    return (
                        <button key={index} className="option-button" onClick={() => onClick(name, optName)}>
                            {optName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default FilterCategory;
