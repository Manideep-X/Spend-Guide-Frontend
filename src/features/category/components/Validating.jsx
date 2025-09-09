const ValidateCategory = (category) => {

    const errors = {};

    if(!category?.name || !category.name.trim()) {
        errors.name = "Category name is required!";
    }
    if(!category?.type || !category.type.trim()) {
        errors.type = "Category type is required!";
    }

    return errors;

}

const ValidateTransaction = (transaction, type) => {

    const errors = {};

    if(!transaction?.name || !transaction.name.trim()) {
        errors.name = `${type} name is required!`;
    }
    if(!transaction?.amount) {
        errors.amount = `Amount for ${type} is required!`;
    }
    if(transaction?.amount <= 0) {
        errors.amount = `${type} amount can't be zero or negetive!`;
    }
    if(!transaction?.categoryId || !transaction.categoryId.trim()) {
        errors.categoryId = `Need a category for this ${type}!`;
    }

    return errors;

}

export default ValidateCategory
export { ValidateTransaction }