// import { catchError, map } from 'rxjs/operators';
// import { LoaderService } from './loader-service';

// interface CustomPropertyDescriptor extends PropertyDescriptor {
//     timer: NodeJS.Timeout;
// }

// export function LoadingScope(): MethodDecorator {
//     return  (
//         target: unknown,
//         propertyKey: string | symbol,
//         descriptor: PropertyDescriptor
//     ) => {
//         const original = descriptor.value;
//           descriptor.value = function (...args: unknown[]) {

//             let timer = (descriptor as CustomPropertyDescriptor).timer;

//             if (timer) {
//                 clearTimeout(timer);
//             }

//             timer = setTimeout(() => {
//                LoaderService.showLoader();
//             }, 200);

//             return original.apply(this, args)
//               .pipe(
//                 map((res) => {
//                   clearTimeout(timer);
//                   LoaderService.hideLoader();
//                   return res;
//                 }),
//                 catchError((err) => {
//                   clearTimeout(timer);
//                   LoaderService.hideLoader();
//                   throw err;
//                 })
//               );
//         };

//         return descriptor;
//     };
// }
