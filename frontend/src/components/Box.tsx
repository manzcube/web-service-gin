

const Box = ({name, value, onChange, placeholder}: {
    name: string,
    value: string,
    onChange: any,
    placeholder: string,
}) => {
  return (
    <div className='boxes' >
        <label htmlFor={name}>{name}</label>
        <input 
        onChange={onChange} 
        value={value} 
        type={name} 
        id={name} 
        placeholder={placeholder} 
        className='input'
        />
    </div>
  )
}

export default Box