
export default function errorHandler(err, req, res, next) {
  console.log('❌ There was an error.')
  console.log(err.name)
  console.log(err)

  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not found' }) 

  }
  res.sendstatus(505)
  next(err)
}