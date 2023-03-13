import { ContainerSuperiorDropDown, CustomDropDownContainer, CustomFormControlContainer, MessageError } from './styles';
import { useState, useMemo, useEffect } from 'react'
import { X } from 'phosphor-react';

interface Search {
  data: any[];
  title: string;
  label: string;
  filter: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
  Select: (number: any, select: any) => void;
  RemoveSelect?: () => void
  titlePesquisa?:string
}

export function CustomDropDown({ data, title, filter, label, error, required, readonly, Select, RemoveSelect , titlePesquisa}: Search) {

  const [titleSelect, setTitleSelect] = useState(title)
  const [value, setValue] = useState("");

  var labelPesquisa =  titlePesquisa ? `Pesquise por ${titlePesquisa}` : `Pesquise por ${filter}`

  const filterData = useMemo(() => {
    if (data) {
      return data.filter(y => y[filter].toLowerCase().toString().includes(value)).slice(0, 10);
    }
  }, [data, value, filter]);

  useEffect(() => { setTitleSelect(title) }, [title])


  function SelectDropDown(number: any, select: any) {
    setTitleSelect(select)
    Select(number, select);
  };

  function DeleteDropDown() {
    if (RemoveSelect) {
      RemoveSelect()
    }
  }

  return (
    <>
      <CustomDropDownContainer>
        <ContainerSuperiorDropDown>
          <span className='label_text'>{label}</span>
          {required &&
            <span className='text-danger'>*</span>
          }
        </ContainerSuperiorDropDown>
        <div className='container-button'>
          <CustomDropDownContainer.Toggle disabled={readonly} variant="backGroudCustom" id="dropdown-basic">
            {titleSelect}
          </CustomDropDownContainer.Toggle>
          <X size={15} cursor="pointer" onClick={DeleteDropDown} />
        </div>
        <CustomDropDownContainer.Menu>

          <CustomFormControlContainer
            type="text"
            placeholder={labelPesquisa}
            className="mb-3"
            value={value}
            onChange={(e: any) => setValue(e.target.value.toLowerCase())}
          />
          {filterData?.map((item) => (
            <CustomDropDownContainer.Item onClick={() =>
              (SelectDropDown(item.id, item[filter]))}
              key={item.id}>
              {
                item[filter]
              }
            </CustomDropDownContainer.Item>
          )
          )}

        </CustomDropDownContainer.Menu>
      </CustomDropDownContainer>
      {error && <MessageError>{error}</MessageError>}
    </>
  );
}
