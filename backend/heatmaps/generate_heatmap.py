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

    # Sum of all values in the heatmap array = 100% errors, calc each value in heatmap to %
    heatmap_int_sum = sum(heatmap_int_list)
    heatmap_perc_list = []
    for i in range(0, len(heatmap_int_list)):
        heatmap_perc_list.append( int( ((heatmap_int_list[i]* 100) / heatmap_int_sum)) )

    hmap_2d_perc = [heatmap_perc_list[i:i + 4] for i in range(0, len(heatmap_perc_list), 4)]
    hmap_2d = [heatmap_int_list[i:i + 4] for i in range(0, len(heatmap_int_list), 4)]
    
    # Generate plot from data
    plt.imshow(hmap_2d, cmap='Greens', interpolation='nearest')
    ax = plt.gca()
    ax.set_title(f'mistake heatmap for user {user_id_str}', fontsize=12, fontweight='bold')
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)

    # Text annotations
    for i in range(len(hmap_2d)):
        for j in range(len(hmap_2d)):
            text = ax.text(j,i,str(hmap_2d_perc[i][j]) + '%',ha="center", va="center", color="w")
    
    # plt.show()
    plot_to_base64(hmap_2d)

def plot_to_base64(heatmap):
    s = io.BytesIO()
    
    plt.plot(heatmap)
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    print(s)

generate_plot()