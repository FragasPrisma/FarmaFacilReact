// import { ContainerSuperiorDropDown, CustomDropDownContainer, CustomFormControlContainer } from './styles';
// import { useState, useMemo } from 'react';

// interface Search {
//     data: any[];
//     title: string;
//     label: string;
//     filter: string;
//     error?: string;
//     required?: boolean;
//     readonly?: boolean;
//     Select: (numbers: any[]) => void;
// }

// export function CustomDropDown({
//     data,
//     title,
//     filter,
//     label,
//     error,
//     required,
//     readonly,
//     Select,
// }: Search) {
//     const [titleSelect, setTitleSelect] = useState(title);
//     const [value, setValue] = useState('');
//     const [selectedIds, setSelectedIds] = useState([]);

//     const labelPesquisa = `Pesquise por ${filter}`;

//     const filterData = useMemo(() => {
//         if (data) {
//             return data.filter(y => y[filter].toLowerCase().toString().includes(value)).slice(0, 10);
//         }
//     }, [data, value, filter]);

//     function SelectDropDown(number: any, select: any) {
//         setSelectedIds([...selectedIds, number]);
//         Select([...selectedIds, number]);
//     }

//     function handlePlaceholder() {
//         if (selectedIds.length === 0) {
//             return title;
//         }
//         if (selectedIds.length === 1) {
//             const selected = data.find(x => x.id === selectedIds[0]);
//             if (selected) {
//                 return selected[filter];
//             }
//         }
//         return `${selectedIds.length} selecionados`;
//     }

//     return (
//         <CustomDropDownContainer>
//             <ContainerSuperiorDropDown>
//                 <span className="label_text">{label}</span>
//                 {required && <span className="text-danger">*</span>}
//             </ContainerSuperiorDropDown>
//             <CustomDropDownContainer.Toggle disabled={readonly} variant="backGroudCustom" id="dropdown-basic">
//                 {handlePlaceholder()}
//             </CustomDropDownContainer.Toggle>
//             <CustomDropDownContainer.Menu>
//                 <CustomFormControlContainer
//                     type="text"
//                     placeholder={labelPesquisa}
//                     className="mb-3"
//                     value={value}
//                     onChange={e => setValue(e.target.value.toLowerCase())}
//                 />
//                 {filterData?.map(item => (
//                     <CustomDropDownContainer.Item
//                         onClick={() => SelectDropDown(item.id, item[filter])}
//                         key={item.id}
//                     >
//                         {item[filter]}
//                     </CustomDropDownContainer.Item>
//                 ))}
//             </CustomDropDownContainer.Menu>
//             {error && <p className="error">{error}</p>}
//         </CustomDropDownContainer>
//     );
// }