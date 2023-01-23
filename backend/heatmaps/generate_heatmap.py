import base64
import io
import matplotlib
import matplotlib.pyplot as plt
import sys

def generate_plot():
    # sys.argv[1] === heatmap array
    # print('heatmap data ' + sys.argv[1])
    plt.plot([1, 2, 3, 4])
    plt.ylabel('some numbers')

def plot_to_base64():
    s = io.BytesIO()
    plt.plot(list(range(100)))
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    print(s)

generate_plot()
plot_to_base64()