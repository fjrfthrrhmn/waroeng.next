// export function DataTableToolbar({ withSearch, buttonsAction }: ToolBarProps) {
//   return (
//     <div className="my-2 flex items-center gap-2 w-full">
//       {/* Buat Props agar dapat mengatur searchBar */}
//       {/* {withSearch && <SearchBar className="flex-1" />} */}

//       {/* TODO: Limit button */}
//       {buttonsAction?.map((action, index) => {
//         if (action.type === 'component') return <div key={index}>{action.component}</div>;

//         const { icon, className, ...buttonProps } = action;

//         return (
//           <Button key={index} {...buttonProps} className={className}>
//             {icon}
//           </Button>
//         );
//       })}
//     </div>
//   );
// }
