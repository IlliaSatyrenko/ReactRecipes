import { useNavigate } from "react-router-dom";
import styles from "./Item.module.css";
import { useState } from "react";

function Item(itemInfo: any) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState<boolean>(false);

    const item = itemInfo.itemInfo;
    const name: string = item.strMeal;
    const category: string = item.strCategory;
    const tags: string = item.strTags?.replace(/,/g, ", ");
    const image: string = "url(" + item.strMealThumb + ")";
    const ingredients: string[] = [];

    for (let i = 1; i < 21; i++) {
        if (!item["strIngredient" + i]) break;
        ingredients.push(item["strIngredient" + i]);
    }

    return (
        <div className={styles.item} style={{ backgroundImage: image }} onClick={() => navigate("/item/" + item.idMeal)}>
            <div
                className={styles.favButton}
                onClick={(event) => {
                    event.stopPropagation();
                    setChecked(!checked);
                }}
            >
                <input type="checkbox" className={styles.favInput} />
                <span className={styles.customFavButton} />
            </div>
            <div className={styles.itemInfo}>
                <div className={styles.infoWrapper}>
                    <span className={styles.itemName}>{name}</span>
                    <span className={styles.itemCategory}>{category}</span>
                    <span className={styles.itemTags}>{tags}</span>
                    <div className={styles.itemIngredients}>
                        {ingredients.map((ingred: string, index: number) => {
                            return (
                                <span key={index} className={styles.itemIngred}>
                                    {ingred},
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
