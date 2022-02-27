import os
from tkinter import Y
import streamlit.components.v1 as components
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np



# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "compoundInterest",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("compoundInterest", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def my_component(currPage):
    
    component_value = _component_func(currPage=currPage, page3index=0)
    return component_value

single_correct_dict = dict.fromkeys(np.arange(0, 10))
compound_correct_dict = dict.fromkeys(np.arange(0, 10))
single_correct_dict[0] = 1000
compound_correct_dict[0] = 1000

def getCorrectDF(index, page3submitted, number):
    
   
    if(page3submitted):
        maxnum = 3+index*2
    else:
        maxnum = 3+max(0, (index-1))*2
    
    for i in range(1, maxnum):
        single_correct_dict[i] = round(1000*(1+number*i))
        compound_correct_dict[i] = round(1000*(1+number)**i)
    df_single_correct = pd.DataFrame.from_dict(single_correct_dict, orient='index', columns=['y']).reset_index()
    df_compound_correct = pd.DataFrame.from_dict(compound_correct_dict, orient='index', columns=['y']).reset_index()
    return df_single_correct, df_compound_correct



def getDF(index, page3submitted, data, number):
    single_dict = dict.fromkeys(np.arange(0, 10))
    compound_dict = dict.fromkeys(np.arange(0, 10))
    # iterate through each filed in dictionary data and add to dictionary
    if(page3submitted):
        maxnum = 3+index*2
    else:
        maxnum = 3+max(0, (index-1))*2

    for key, value in data.items():
        if(value != '' and int(key[1:]) < maxnum):
            if(key[0] == 'c'):
                if(key[1] == '3'):
                    finalvalue = round(1000*(1+number)**int(value))
                    compound_dict[int(key[1:])] = finalvalue
                else:
                    compound_dict[int(key[1:])] = int(value)
            elif(key[0] == 's'):
                if(key[1] == '3'):
                    finalvalue = round(1000*(1+number*int(value)))
                    single_dict[int(key[1:])] = finalvalue
                else:
                    single_dict[int(key[1:])] = int(value)

    # create dataframe from dictionary
    df_compound = pd.DataFrame.from_dict(compound_dict, orient='index', columns=['y']).reset_index()
    df_single = pd.DataFrame.from_dict(single_dict, orient='index', columns=['y']).reset_index()
    return df_single, df_compound

def getPage3Feedback(index):
    if(index == 1):
        return '''3rd year:
        1000 * (1+4%*3) = 1120
        1000* (1+4%)^3= 1129
4st year:
        1000 * (1+4%*4) = 1160
        1000* (1+4%)^4 = 1170'''
    elif(index == 2):
        return '''5st year:
        1000 * (1+4%*5) = 1200
        1000* (1+4%)^5 = 1216
6st year:
        1000 * (1+4%*6) = 1240
        1000* (1+4%)^6 = 1265'''
    elif(index == 3):
        return '''
7st year:
        1000 * (1+4%*7) = 1280
        1000* (1+4%)^7 = 1316

8st year:
        1000 * (1+4%*8) = 1320
        1000* (1+4%)^8 = 1369'''
 
    



# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/__init__.py`
if _RELEASE:
    import streamlit as st
    
    # st.set_page_config(layout='wide') 

   
    curr_state = my_component(0)
    curr_page = curr_state["currPage"]
    # st.write(curr_state)
    page3index = 0
    page3value = 0
    page3submitted = False
   
    if(curr_page == 3):
        page3index = curr_state["page3index"]
        page3value = curr_state["page3value"]
        page3submitted = curr_state["page3submitted"]
    
    # curr_page = 0

    if(curr_page == 1):
        video_file = open('./CompoundInterest.mp4', 'rb')
        video_bytes = video_file.read()

        st.video(video_bytes)
        st.subheader("Open Ended Questions")
        txt1 = st.text_area('1. Explain the difference between compound interest and simple interest?', value="")
        if st.button('submit',key="submit1"):
            st.write("Compound interest is basically a concept that overtime, your money begins to make you money when the interest compounds on your principle.")

    if(curr_page == 2):
        # number = st.number_input('Insert an interest rate', format="%f",step=0.1, min_value=0.1, max_value=0.9)
        # st.write('The current interest is ', number)
        number = 0.06
        x = np.arange(2022, 2033)

        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=x, 
            y=1000*(1+number)**(x-2022), 
            hovertemplate="%{y}%{_xother}",
            name="Compound Interest"))
        fig.add_trace(go.Scatter(
            x=x, 
            y=1000*(1+number*(x-2022)), 
            hovertemplate="%{y}%{_xother}",
            name="Single Interest"))
        fig.update_traces(hoverinfo='text',mode="markers+lines",)
        fig.update_layout(title='Total revenue',
                   xaxis_title='Year',
                   yaxis_title='Dollar',
                   legend=dict(y=0.5, font_size=13),
                   hovermode="x unified")
        st.plotly_chart(fig, use_container_width=True)
        st.subheader("Open Ended Questions")
        txt1 = st.text_area('1. Who is able to gain more money?', value="")
        if st.button('submit',key="submit2"):
            st.write("feedback")
        txt2 = st.text_area('2. Observe the graph of simple interest, which type of function is most similar? What about compound interest?', value="")
        # st.write('Question:', txt)
        if st.button('submit',key="submit3"):
            st.write("feedback")
        
        # m = st.markdown("""
        # <style>
        # div.stButton > button:first-child {
        #     background-color: rgb(204, 49, 49);
        # }
        # </style>""", unsafe_allow_html=True)

        # b = st.button("test")
    if(curr_page == 3):
        fig = go.Figure()
        number = 0.04
        df_single_correct, df_compound_correct = getCorrectDF(page3index, page3submitted, number)
        if(page3index > 0 and page3index < 4):
            df_single, df_compound = getDF(page3index, page3submitted, page3value, number)
            fig.add_trace(go.Scatter(
                x=df_single['index'],
                y=df_single['y'],
                text="y",
                hovertemplate="%{y}%{_xother}",
                opacity=0.7,
                marker=dict(
                    color='#70e1f5',
                    size=15,
                    symbol='x',
                ),
                mode="markers",
                name="Your Single Interest"))
            fig.add_trace(go.Scatter(
                x=df_compound['index'],
                y=df_compound['y'],
                text="y",
                hovertemplate="%{y}%{_xother}",
                opacity=0.7,
                marker=dict(
                    color='#ffd194',
                    size=15,
                    symbol='x',
                ),
                mode="markers",
                name="Your Compound Interest"))

       
        if(page3index < 4):
            fig.add_trace(go.Scatter(
                x=df_single_correct['index'],
                y=df_single_correct['y'],
                hovertemplate="%{y}%{_xother}",
                name="Correct Single Interest",
                # opacity=0.5,
                line_color="#30E8BF",
                line_width=2,
                mode="markers+lines"))
            
            fig.add_trace(go.Scatter(
                x=df_compound_correct['index'],
                y=df_compound_correct['y'],
                hovertemplate="%{y}%{_xother}",
                # opacity=0.5,
                line_color="#FF8235",
                line_width=2,
                name="Correct Compund Interest",
                mode="markers+lines"))
        
            fig.update_layout(title='Total revenue',
                    xaxis_title='Year',
                    xaxis=dict(
                        dtick=1,
                    ),
                    yaxis_title='Dollar',
                    yaxis=dict(
                        dtick=25,
                        range=[980, 1400]
                    ),
                    
                    legend=dict(
                        yanchor='bottom',
                        xanchor='right',
                        #    y=0.5, 
                        font_size=10))
            st.plotly_chart(fig, use_container_width=True)
            if(page3index > 0 and page3submitted):
                st.subheader('Feedback')
                st.code(getPage3Feedback(page3index),language="python")
        
        if(page3index == 4):
            number = 0.04
            # st.write('The current interest is ', number)
            x = np.arange(0, 100)

            fig = go.Figure()
            
            fig.add_trace(go.Scatter(
                x=x, 
                y=1000*(1+number*(x)), 
                hovertemplate="%{y}%{_xother}",
                line_color="#30E8BF",
                name="Single Interest"))
            fig.add_trace(go.Scatter(
                x=x, 
                y=1000*(1+number)**(x), 
                hovertemplate="%{y}%{_xother}",
                line_color="#FF8235",
                name="Compound Interest"))
            fig.update_traces(hoverinfo='text',mode="lines",)
            fig.update_layout(title='Total revenue',
                    xaxis_title='Year',
                    yaxis_title='Dollar',
                    legend=dict(
                        yanchor='bottom',
                        xanchor='right',
                        #    y=0.5, 
                        font_size=13),
                    hovermode="x unified")
            st.plotly_chart(fig, use_container_width=True)

    else:
        pass

    
    
