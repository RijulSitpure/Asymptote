from solution import Robot

def run_tests():
    r = Robot(6, 3)
    r.step(2)
    r.step(2)
    assert r.getPos() == [4, 0]
    assert r.getDir() == "East"
    r.step(2)
    r.step(1)
    r.step(4)
    assert r.getPos() == [1, 2]
    assert r.getDir() == "West"
    print("All tests passed for walking-robot-simulation-ii!")

if __name__ == "__main__":
    run_tests()
