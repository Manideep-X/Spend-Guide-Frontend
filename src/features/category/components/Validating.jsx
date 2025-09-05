const ValidateCategory = (category) => {

    const errors = {};

    if (!category?.name || !category.name.trim()) {
        errors.name = "Category name is required!";
    }
    if(!category?.type || !category.type.trim()) {
        errors.type = "Category type is required!";
    }

    return errors;

}

export default ValidateCategory