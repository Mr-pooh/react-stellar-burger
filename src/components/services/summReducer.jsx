


export const startSumm = {price: 0};

export const reducer = (state, {type, elem}) => {

    const summIngridient = () => {
        if(elem.ingridients.length === 0){
            return 0
        }
        else{

           return  elem.ingridients.reduce((a, b) => a + b.price, startSumm.price);
        }
    }
    console.log(summIngridient())
    
    switch(type){
        case 'add':
            if(elem.bun !== null){
             return {
                        price: 2* elem.bun.price + summIngridient()
                    }
                }
            else if(elem.ingridients.length !== 0){
                return {
                    price: summIngridient()
                }
            }
            else{
                    return {price: state.price}
                }   
        default:
            throw new Error(`Wrong type of action: ${type}`);
                    
    }
}