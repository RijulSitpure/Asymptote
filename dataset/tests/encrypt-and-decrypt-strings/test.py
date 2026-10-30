from solution import Encrypter
enc = Encrypter(['a', 'b', 'c', 'd'], ["ei", "zf", "ei", "am"], ["abcd", "acbd", "adbc", "badc", "dacb", "cadb", "cbda", "abad"])
assert enc.encrypt("abcd") == "eizfeiam"
assert enc.decrypt("eizfeiam") == 2
print("All tests passed for encrypt-and-decrypt-strings!")
