export const checkAuth =(req,res,next)=>{
  const isAdmin = true;
  if(isAdmin){
    return next();
  }
  console.log("cut");
}