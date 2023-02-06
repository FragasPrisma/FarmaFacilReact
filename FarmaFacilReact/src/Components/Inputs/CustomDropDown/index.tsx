import {ContainerSuperiorDropDown, CustomDropDownContainer,CustomFormControlContainer} from './styles';
import {useState,useMemo} from 'react'

interface Search {
  data: any[];
  title:string;
  label:string;
  filter:string;
  error?:string;
  required?:boolean;
  readonly?:boolean;
  Select: (number: any) => void
}
  
export function CustomDropDown({data,title,filter,label,error,required,readonly,Select}:Search){

    const [titleSelect,setTitleSelect] = useState(title)
    const [value, setValue] = useState("");
    
    var labelPesquisa = `Pesquise por ${filter}`

    const filterData = useMemo(() => {
        if(data){
            return data.filter(y => y[filter].toLowerCase().toString().includes(value)).slice(0,10);
        }
    }, [data, value, filter]);

    function SelectDropDown(number:any,select:any){
        setTitleSelect(select)
        Select(number);
    };
    
    return (
        
        <CustomDropDownContainer>
        <ContainerSuperiorDropDown>
            <span className='label_text'>{label}</span>
            {required &&
              <span className='text-danger'>*</span>
            }
          </ContainerSuperiorDropDown>
          <CustomDropDownContainer.Toggle disabled={readonly} variant="backGroudCustom" id="dropdown-basic">
            {titleSelect}
          </CustomDropDownContainer.Toggle>
          <CustomDropDownContainer.Menu>
            <CustomFormControlContainer
              type="text"
              placeholder={labelPesquisa}
              className="mb-3"
              value={value}
              onChange={(e:any) => setValue(e.target.value.toLowerCase())}
            />
            {filterData?.map((item) => (
                    <CustomDropDownContainer.Item onClick={() => 
                        (SelectDropDown(item.id,item[filter]))} key={item.id}>{item[filter]}
                    </CustomDropDownContainer.Item>
                )
            )}
          </CustomDropDownContainer.Menu>
          {error && <p className='error'>{error}</p>}
        </CustomDropDownContainer>
      );
}
  