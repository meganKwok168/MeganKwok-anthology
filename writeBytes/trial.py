with open("trial.txt","wb") as f: #can also use ab
    i = 10
    b = i.to_bytes(1,byteorder="little")
    f.write(b)
