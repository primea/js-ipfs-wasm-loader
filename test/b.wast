(module
  (import "zdpuB3eZFjLEhDGiCaawbLyu56QfHGBNmr1zmZTkakCBpDFfE" "addTwo" (func $cAddTwo (param i32 i32) (result i32)))
  (func $addTwo (param i32 i32) (result i32)
    (call $cAddTwo (get_local 0) (get_local 1))
  )
  (export "addTwo" (func $addTwo)))
