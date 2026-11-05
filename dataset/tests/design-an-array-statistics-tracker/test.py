from solution import StatisticsTracker

def run_tests():
    st = StatisticsTracker()
    st.addNumber(3)
    st.addNumber(8)
    st.addNumber(4)
    assert st.getMean() == 5, "Mean check failed"
    assert st.getMedian() == 4, "Median check failed"
    assert st.getMode() == 3, "Mode check failed"
    st.addNumber(8)
    assert st.getMedian() == 8, "Median check failed after add"
    assert st.getMode() == 8, "Mode check failed after add"
    st.removeFirstAddedNumber()
    assert st.getMean() == 6, "Mean check failed after remove"
    assert st.getMedian() == 8, "Median check failed after remove"
    assert st.getMode() == 8, "Mode check failed after remove"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

