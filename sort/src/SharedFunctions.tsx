
const copy_array = (array: any): any => {
  let arr: any = [];
  for (let i = 0; i < array.length; i++) {
    arr.push(array[i]);
  }
  return arr
}

const swap = (array: number[], i: number, j: number) => {
	let temp: number = array[i]
	array[i] = array[j]
	array[j] = temp
}



export { copy_array, swap };