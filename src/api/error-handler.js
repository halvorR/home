/**
 * Handle error from all services.
 * I had to implement this common method since
 * errors are proagated in the callchain which results
 * in error callbacks receiving errors from unrelated calls.
 *
 * @param error
 */
export default function(error){
    console.error("SERVICE ERR:", error);
}
