import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const { name, email } = loggedInUser;
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();
   const onSubmit = data => console.log(data);

   console.log(watch('example')); // watch input value by passing the name of it

   return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
         <input
            name="name"
            defaultValue={name}
            {...register('name', { required: true })}
            placeholder="Your Name"
         />
         {errors.name && <span className="error">Name is required</span>}

         <input
            name="email"
            defaultValue={email}
            {...register('email', { required: true })}
            placeholder="Your email"
         />
         {errors.email && <span className="error">Email is required</span>}

         <input
            name="address"
            {...register('address', { required: true })}
            placeholder="Your Address"
         />
         {errors.address && <span className="error">Address is required</span>}

         <input
            name="phone"
            {...register('phone', { required: true })}
            placeholder="Phone number"
         />
         {errors.phone && (
            <span className="error">Phone number is required</span>
         )}

         <input type="submit" />
      </form>
   );
};

export default Shipment;
