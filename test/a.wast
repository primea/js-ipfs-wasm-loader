(module
  (import "zdpuAvYeR2k18Zh2ZP7GetdkT1mE87hKM4wsxnwriRA9NM3df" "addTwo" (func $bAddTwo (param i32 i32) (result i32)))
  (import "NOT_A_IPFS_HASH" "log" (func (param i32)))

  (func $addTwo (param i32 i32) (result i32)
    (call $bAddTwo (get_local 0) (get_local 1))
  )
  (export "addTwo" (func $addTwo)))
