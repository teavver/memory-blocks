import matplotlib.pyplot as plt
import numpy as np
import matplotlib
import base64
import sys
import io

def generate_plot():

    # Data from redis
    heatmap_str = sys.argv[1]
    user_id_str = sys.argv[2]
    
    # Convert heatmap_str to list, then to chunks
    heatmap_list = heatmap_str.split(',')
    heatmap_int_list = [eval(i) for i in heatmap_list]
    hmap_2d = [heatmap_int_list[i:i + 4] for i in range(0, len(heatmap_int_list), 4)]
    
    # Generate plot from data
    
    # Local test
    plt.imshow(hmap_2d, cmap='Greens', interpolation='nearest')
    ax = plt.gca()
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)
    plt.show()

    # plot_to_base64(hmap_2d)

def plot_to_base64(heatmap):
    s = io.BytesIO()
    
    plt.plot(heatmap)
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    # print(s)

generate_plot()