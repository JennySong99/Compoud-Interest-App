import {
    Streamlit,
    StreamlitComponentBase,
    withStreamlitConnection,
  } from "streamlit-component-lib"
import React, { ReactNode } from "react"
import "./compoundInterest.css"

  interface State {
    currPage: number,
    page3index: number,
    page3value: any,
    page3submitted: boolean,
    page4index: number,
    page4value: any,
    page4submitted: boolean,
    page4score: number,
    page4currentQ: string,
    page4nextclicked: boolean,
  }

  
  
  /**
   * This is a React-based component template. The `render()` function is called
   * automatically when your component should be re-rendered.
   */
  class CompoundInterest extends StreamlitComponentBase<State> {
    constructor(props:any) {
        super(props);
        var page3ValueDict:any = {};
        page3ValueDict["s3"] = "";
        page3ValueDict["c3"] = "";
        for (var i = 4; i < 10; i++) {
            // make i to string
            var strI = i.toString();
            page3ValueDict["s"+strI] = "";
            page3ValueDict["c"+strI] = "";
            page3ValueDict["e"+strI] = "";
            page3ValueDict["d"+strI] = "";
        }
        this.state = { 
            currPage: 0, 
            page3index: 0,
            page3value: page3ValueDict,
            page3submitted: false,
            page4index: 0,
            page4value: {
                "l20":"",
                "l21":"",
            },
            page4submitted: false,
            page4score: 0,
            page4currentQ:"",
            page4nextclicked: false
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleP4FormSubmit = this.handleP4FormSubmit.bind(this);
        this.handleP4ValueChange = this.handleP4ValueChange.bind(this);
        this.page4GoNext = this.page4GoNext.bind(this);
        Streamlit.setComponentValue({"currPage": 0});

    }
   

    private goFirst = (): void => {
        
        this.setState(
            { currPage: 1 },
        )
      
        Streamlit.setComponentValue({"currPage": 1});
    }

    

  
    public render = (): ReactNode => {
        
        const navButtons:React.CSSProperties = {
            marginBottom:"20px",
            height:"40px"
            
        }

        
    
        return (
            
            <div>
                <div style={navButtons} >

                {this.state.currPage === 1 &&
                    <div className="float-sm-left">

                    <button
                        onClick={this.goPrev}
                        className="btn btn-primary"
                    >Home</button>
                    </div>
                }

                {this.state.currPage - 1 > 0 &&
                    <div className="float-sm-left">

                    <button
                        onClick={this.goPrev}
                        className="btn btn-primary"
                    >Prev</button>
                    </div>
                }
                {this.state.currPage !== 0 && this.state.currPage + 1 < 5 &&
                   <div className="float-sm-right">
                    <button
                        onClick={this.goNext}
                        className="btn btn-primary"
                    >Next</button>
                    </div>
                }
                {this.state.currPage === 4 &&
                    <div className="float-sm-right">

                    <button
                        onClick={this.goFirst}
                        className="btn btn-primary"
                    >Restart</button>
                    </div>
                }

                </div>
                <div>{this.pageContent()}</div>
            </div>
        )
    }

    
    private page3GoBack = (): void => {
        let newPage:number = this.state.page3index - 1
        this.setState(
            { page3index: newPage },
        )
        Streamlit.setComponentValue(
            {...this.state,
                page3index: newPage
            });
    }

    private page3GoForward = (): void => {
        let newPage:number = this.state.page3index + 1
        this.setState(
            { page3index: newPage },
        )
        Streamlit.setComponentValue(
            {...this.state,
                page3index: newPage
            });
    }

    private handleValueChange(e: any) {
        // this.state.page3value.set(e.target.id, e.target.value);
        e.persist();
        if(this) {
            this.setState( prevState => ({
                page3value: {
                    ...prevState.page3value,
                [e.target.name]: e.target.value 
                }
               
            }))
            
        }
        

    }

    private handleFormSubmit(e: any) {
        e.preventDefault();
        // send multiple state value to streamlit
        Streamlit.setComponentValue(
            {...this.state,
                page3submitted: true});

    }

    private page3Content = () => {
        if(this.state.page3index === 0) {
            return (
                <div className="page3Questions">
                    <p><strong>1st year: </strong></p>
                    <p>simple interest: <span className="page3Equations">1000 * (1+4%) = 1040</span></p>
                    <p>Your friend account with compound interest: <span className="page3Equations">1000* (1+4%) = 1040</span></p>

                    <p><strong>2nd year:</strong></p>
                    <p>simple interest: <span className="page3Equations">1000 * (1+4%+4%) = 1000 * (1+4%*2) = 1080 </span></p>
                    <p>compound interest: <span className="page3Equations">1040*((1+4%)) = 1000*(1+4%)(1+4%)=1082</span></p>

                </div>
            )
        } else if (this.state.page3index === 1) {
            return (
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                    <p><strong>3rd year:</strong></p>
                        <p>simple interest: 
                            <span className="page3Equations"> 1000 * (1+4%+4%+4%) = 1000 * (1+4%*</span>
                            <input type="text" name="s3" className="numberInput" value={this.state.page3value["s3"]} onChange={this.handleValueChange} />
                            <span className="page3Equations">) = {this.state.page3value["s3"] !== "" && Math.round(1000*(1+0.04*(parseInt(this.state.page3value["s3"]))))}</span></p>
                        <p>compound interest: <span className="page3Equations"> = 1000*(1+4%)(1+4%)(1+4%)</span></p>
                        <p><span className="page3Equations"> = 1000*(1+4%)^
                        <input type="text" name="c3" className="numberInput" value={this.state.page3value["c3"]} onChange={this.handleValueChange} /> = {this.state.page3value["c3"] !== "" && Math.round(1000*(1+0.04)**(parseInt(this.state.page3value["c3"])))}</span></p>

                    <p><strong>4th year:</strong></p>
                    <p>simple interest: 
                        <span className="page3Equations"> 1000 * (1+4%*</span>
                        <input type="text" name="e4" className="numberInput" value={this.state.page3value["e4"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations">) = </span><input type="text" name="s4" className="numberInput" value={this.state.page3value["s4"]} onChange={this.handleValueChange} /></p>
                    <p>compound interest: 
                        <span className="page3Equations"> 1000* (1+4%)^</span>
                        <input type="text" name="d4" className="numberInput" value={this.state.page3value["d4"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations"> = </span><input type="text" name="c4" className="numberInput" value={this.state.page3value["c4"]} onChange={this.handleValueChange} /></p>
                    <input className="page3Submit" type="submit" value="Submit" />
                    </form>
                </div>
            )
        } else if (this.state.page3index === 2) {
            return (
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                    <p><strong>5th year:</strong></p>
                    <p>simple interest: 
                        <span className="page3Equations"> 1000 * (1+4%*</span>
                        <input type="text" name="e5" className="numberInput" value={this.state.page3value["e5"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations">) = </span><input type="text" name="s5" className="numberInput" value={this.state.page3value["s5"]} onChange={this.handleValueChange} /></p>
                    <p>compound interest: 
                        <span className="page3Equations"> 1000* (1+4%)^</span>
                        <input type="text" name="d5" className="numberInput" value={this.state.page3value["d5"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations"> = </span><input type="text" name="c5" className="numberInput" value={this.state.page3value["c5"]} onChange={this.handleValueChange} /></p>
                    
                    <p><strong>6th year:</strong></p>
                    <p>simple interest: 
                        <span className="page3Equations"> 1000 * </span>
                        <input type="text" name="e6" className="numberInput" value={this.state.page3value["e6"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations"> = </span><input type="text" name="s6" className="numberInput" value={this.state.page3value["s6"]} onChange={this.handleValueChange} /></p>
                    <p>compound interest: 
                        <span className="page3Equations"> 1000* </span>
                        <input type="text" name="d6" className="numberInput" value={this.state.page3value["d6"]} onChange={this.handleValueChange}/>
                        <span className="page3Equations"> = </span><input type="text" name="c6" className="numberInput" value={this.state.page3value["c6"]} onChange={this.handleValueChange} /></p>

                    <input className="page3Submit" type="submit" value="Submit" />
                    </form>
                </div>
                )
        } else if (this.state.page3index === 3) {
            return (
                <div>
                <form onSubmit={this.handleFormSubmit}>
                <p><strong>7th year:</strong></p>
                <p>simple interest: 
                    <span className="page3Equations"> 1000 * </span>
                    <input type="text" name="e7" className="numberInput" value={this.state.page3value["e7"]} onChange={this.handleValueChange}/>
                    <span className="page3Equations"> = </span><input type="text" name="s7" className="numberInput" value={this.state.page3value["s7"]} onChange={this.handleValueChange} /></p>
                <p>compound interest: 
                    <span className="page3Equations"> 1000 * </span>
                    <input type="text" name="d7" className="numberInput" value={this.state.page3value["d7"]} onChange={this.handleValueChange}/>
                    <span className="page3Equations"> = </span><input type="text" name="c7" className="numberInput" value={this.state.page3value["c7"]} onChange={this.handleValueChange} /></p>
                
                <p><strong>8th year:</strong></p>
                <p>simple interest: 
                    {/* <span className="page3Equations"> 1000 * </span> */}
                    <input type="text" name="e8" className="numberInput" value={this.state.page3value["e8"]} onChange={this.handleValueChange}/>
                    <span className="page3Equations"> = </span><input type="text" name="s8" className="numberInput" value={this.state.page3value["s8"]} onChange={this.handleValueChange} /></p>
                <p>compound interest: 
                    {/* <span className="page3Equations"> 1000* </span> */}
                    <input type="text" name="d8" className="numberInput" value={this.state.page3value["d8"]} onChange={this.handleValueChange}/>
                    <span className="page3Equations"> = </span><input type="text" name="c8" className="numberInput" value={this.state.page3value["c8"]} onChange={this.handleValueChange} /></p>

                <input className="page3Submit" type="submit" value="Submit" />
                </form>
            </div>
            )
        } else if (this.state.page3index === 4) {
            return (
                <div className="page3Questions">
                    <p><strong>nth year: </strong></p>
                    <p>simple interest: <span className="page3Equations"> 1000 * (1+4%*n)</span></p>
                    <p>Amy's account with compound interest: <span className="page3Equations">1000 * (1+4%)^n</span></p>

                    <p>As you can see, the account with simple interest could be calculated by linear functions, which grow by equal differences ($40/year) over the years, the account with compound interest could be calculated by exponential functions, which grow by equal factors (4%) over the years. </p>

                </div>
            )
        } else if (this.state.page3index === 5) {
            return (
                <div className="page3Questions">
                    <p><strong>Formula</strong></p>
                    <p>A = Final Amout</p>
                    <p>P = initial principal balance</p>
                    <p>r = interest rate</p>
                    <p>n = year</p>
                    <p>Account with simple interest:   <span className="page3Equations">A = P*(1+r*n)</span></p>
                    <p>Account with compound interest:  <span className="page3Equations">A = P*(1+r)^n</span></p>


                </div>
            )
        }
    }
        

    private Qlist = {
        "l1":[{
            "question": "You want to get a principal and interest sum of $1,000 from the bank after 4 years at an annual interest rate of 5%. How should you calculate how much you need to deposit in the bank now under the simple interest method?",
            "choices": [" A: 1000 * 1 / (1+5%)", " B: 1000 * (1+5%)", " C: 1000 * 1 / (1+5%*4)", " D 1000 * (1+5%*4)"],
            "feedback":["A: Incorrect. Please read the question again and figure out how long does the deposit last? Is it 1 year or 4 years?",
            "B: Incorrect. Please read the question again and figure out how long does the deposit last? Is it 1 year or 4 years? The question asks for the principal you need to deposit instead of the money you withdraw.",
            "C: Correct. You apply a great strategy to solve this question.",
            "D: Incorrect. The question asks for the principal you need to deposit instead of the money you withdraw."],
            "answer":"2",
            },{
                "question": "Sarah deposits $5000 initial money in the bank at a yearly compound interest rate of 10%. After how many years will her overall money begin to exceed $7000?",
                "choices": [" A: 2 years", " B: 3 years", " C: 4 years", " D: 5 years"],
                "answer":"2",
                "feedback":[]
            },{
                "question": " Alice and Amy both save $1000 in the bank. Alice chooses the 5% yearly simple interest rate. Amy chooses the 5% yearly compound interest rate. They will both withdraw their savings in the 4th year. How much money will Amy gain more than Alice?",
                "choices": [" A: 0", " B: 5", " C: 15", " D: 31"],
                "answer":"2",
                "feedback":[]
            }],
        "l2": [{
            "question": " You deposit $2,000 in a bank for a fixed term of 3 years at an interest rate of 10% per year, and you choose to compound the interest. At the end of the 3 years, calculate how much money you will receive from the bank.",
            "answer":"2000*(1+10%)^3=2662",
            },{
                "question": "Your brother Jack and you invest money in the bank together. Jack invests $4100 at 5% yearly simple interest. You invest $4000 at 5% yearly compound interest. Can you tell who will receive more money in the third year? Try to calculate each person's account money and explain why. ",
                "answer":"Jack: 4100 * (1+5%*3)=4715\
                        You: 4000*(1+5%)^3=4630.5\
                        Jack will receive more money",
                "choices":[],
                "feedback":[]
            },{
                "question": " You save $1000 in the bank 10% per year simple interest. After saving for 2 years, you learn the difference between simple interest and compound interest. You decide to withdraw all your money and then save them in another bank at a yearly compound interest of 5% for 2 years. How much money will you get after the entire 4 years?",
                "answer":"2 year simple: 1000 * (1+10%*2)=1200\
                        2 year compound: 1200 * (1+10%)^2=1452",
                "choices":[],
                "feedback":[]
            }],
    }

    private QhtmlList = () =>([
        (<div>
            <p>{this.Qlist["l1"][0].question}</p>
            <div>
                <input type="radio" name="l10" value="a0" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l10" in this.state.page4value && this.state.page4value["l10"] === "a0"}/>
                <label htmlFor="a0">{this.Qlist["l1"][0].choices[0]}</label>
            </div>
            <div>
                { this.state.page4submitted && this.state.page4value["l10"] === "a0" &&
                    <div className="alert alert-warning" role="alert">
                        {this.Qlist["l1"][0].feedback && this.Qlist["l1"][0].feedback[0]}</div>
                }
            </div>
            <div>
                <input type="radio" name="l10" value="a1" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l10" in this.state.page4value && this.state.page4value["l10"] === "a1"}/>
                <label htmlFor="a1">{this.Qlist["l1"][0].choices[1]}</label>
            </div>
            <div>
                { this.state.page4submitted && this.state.page4value["l10"] === "a1" &&
                    <div className="alert alert-warning" role="alert">
                        {this.Qlist["l1"][0].feedback && this.Qlist["l1"][0].feedback[1]}</div>
                }
            </div>
            <div>
                <input type="radio" name="l10" value="a2" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l10" in this.state.page4value && this.state.page4value["l10"] === "a2"}/>
                <label htmlFor="a2">{this.Qlist["l1"][0].choices[2]}</label>
            </div>
            <div>
                { this.state.page4submitted && this.state.page4value["l10"] === "a2" &&
                    <div className="alert alert-success" role="alert">
                        {this.Qlist["l1"][0].feedback && this.Qlist["l1"][0].feedback[2]}</div>
                }
            </div>
            <div className="page4buttonspace">
            {!this.state.page4submitted && <button type="button" disabled={!("l10" in this.state.page4value)} className="btn btn-outline-success ustify-content-md-end page4submit" onClick={this.handleP4FormSubmit}>Submit</button>}
            {this.state.page4submitted && <div className="float-sm-right"><button type="button" className="btn btn-outline-success ustify-content-md-end" onClick={this.page4GoNext}>Next</button></div>}
            </div>
            
        
        </div>),(
            <div>
            <p>{this.Qlist["l1"][1].question}</p>
            <div>
                <input type="radio" name="l11" value="b0" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l11" in this.state.page4value && this.state.page4value["l11"] === "b0"}/>
                <label htmlFor="b0">{this.Qlist["l1"][1].choices[0]}</label>
            </div>
            <div>
                <input type="radio" name="l11" value="b1" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l11" in this.state.page4value && this.state.page4value["l11"] === "b1"}/>
                <label htmlFor="b1">{this.Qlist["l1"][1].choices[1]}</label>
            </div>
            <div>
                <input type="radio" name="l11" value="b2" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l11" in this.state.page4value && this.state.page4value["l11"] === "b2"}/>
                <label htmlFor="b2">{this.Qlist["l1"][1].choices[2]}</label>
            </div>
            <div className="page4buttonspace">
            {!this.state.page4submitted && <button type="button" disabled={!("l11" in this.state.page4value)} className="btn btn-outline-success ustify-content-md-end page4submit" onClick={this.handleP4FormSubmit}>Submit</button>}
            {this.state.page4submitted && <div className="float-sm-right"><button type="button" className="btn btn-outline-success ustify-content-md-end" onClick={this.page4GoNext}>Next</button></div>}
            </div>
            
        </div>
        ),(
            <div>
            <p>{this.Qlist["l1"][2].question}</p>
            <div>
                <input type="radio" name="l12" value="c0" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l12" in this.state.page4value && this.state.page4value["l12"] === "c0"}/>
                <label htmlFor="c0">{this.Qlist["l1"][2].choices[0]}</label>
            </div>
            <div>
                <input type="radio" name="l12" value="c1" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l12" in this.state.page4value && this.state.page4value["l12"] === "c1"}/>
                <label htmlFor="c1">{this.Qlist["l1"][2].choices[1]}</label>
            </div>
            <div>
                <input type="radio" name="l12" value="c2" disabled={this.state.page4submitted} onChange={this.handleP4ValueChange} 
                checked={"l12" in this.state.page4value && this.state.page4value["l12"] === "c2"}/>
                <label htmlFor="c2">{this.Qlist["l1"][2].choices[2]}</label>
            </div>
            <div className="page4buttonspace">
            {!this.state.page4submitted && <button type="button" disabled={!("l12" in this.state.page4value)} className="btn btn-outline-success ustify-content-md-end page4submit" onClick={this.handleP4FormSubmit}>Submit</button>}
            {this.state.page4submitted && <div className="float-sm-right"><button type="button" className="btn btn-outline-success ustify-content-md-end" onClick={this.page4GoNext}>Next</button></div>}
            </div>
            
        
        </div>
        )
    ])


    private oeqlList = ()=>([
        (
            <div>
                <p>{this.Qlist["l2"][0].question}</p>
                <textarea name="l20" className="p4text" value={this.state.page4value["l20"]} onChange={this.handleP4ValueChange} />
                { this.state.page4submitted && this.state.page4value["l20"].trim() === "" && 
                    <div className="alert alert-warning" role="alert">
                        Please provide an answer!</div>}
                { this.state.page4submitted && this.state.page4value["l20"].trim() !== "" && 
                    <div className="alert alert-success" role="alert"> {this.Qlist["l2"][0].answer}</div>}
                <div className="page4buttonspace">
                {!this.state.page4submitted && <button type="button" disabled={this.state.page4value["l20"]=== ""} className="btn btn-outline-success ustify-content-md-end page4submit" onClick={this.handleP4FormSubmit}>Submit</button>}
                {this.state.page4submitted && <div className="float-sm-right"><button type="button" className="btn btn-outline-success ustify-content-md-end" onClick={this.page4GoNext}>Next</button></div>}
                </div>
            </div>
        ),
        (
            <div>
                <p>{this.Qlist["l2"][1].question}</p>
                <textarea name="l21" className="p4text" value={this.state.page4value["l21"]} onChange={this.handleP4ValueChange} />
                { this.state.page4submitted && this.state.page4value["l21"].trim() === "" && 
                    <div className="alert alert-warning" role="alert">
                        Please provide an answer!</div>}
                { this.state.page4submitted && this.state.page4value["l21"].trim() !== "" && 
                    <div className="alert alert-success" role="alert"> {this.Qlist["l2"][1].answer}</div>}
                <div className="page4buttonspace">
                {!this.state.page4submitted && <button type="button" disabled={this.state.page4value["l21"]=== ""} className="btn btn-outline-success ustify-content-md-end page4submit" onClick={this.handleP4FormSubmit}>Submit</button>}
                {this.state.page4submitted && <div className="float-sm-right"><button type="button" className="btn btn-outline-success ustify-content-md-end" onClick={this.page4GoNext}>Next</button></div>}
                </div>
                
           
            </div>
        )]);

    private handleP4FormSubmit(e:any) {
        e.preventDefault();
        this.setState(state => ({
            page4submitted: true
        }));
       
    }

    private handleP4ValueChange(e:any) {
        this.setState({
            page4currentQ: e.target.name,
            page4value: {
                ...this.state.page4value,
                [e.target.name]: e.target.value
            }
        });
    }

    private page4GoNext() {
        let currentQname:string = this.state.page4currentQ;
        let qindex:number = parseInt(currentQname.charAt(2))
        var qinlist;
        var correct: boolean = false;
        var chosenradio = this.state.page4value[currentQname];
        if(currentQname.slice(0, 2) ==="l1") {
            qinlist = this.Qlist["l1"];
            correct = chosenradio.slice(1) === qinlist[qindex].answer;
        } else {
            qinlist = this.Qlist["l2"];
            correct = this.state.page4value[currentQname].trim() !== ""
        }
        

        if(correct){
            this.setState(state => ({
                page4score: state.page4score + 1,
                page4index: this.state.page4index + 1,
                page4nextclicked: true,
                page4submitted: false,
                page4value:{
                    "l20": "",
                    "l21": "",
                }
            }));
        } else {
            this.setState(state => ({
                page4index: this.state.page4index + 1,
                page4nextclicked: true,
                page4submitted: false,
                page4value:{
                    "l20": "",
                    "l21": "",
                }
            }));
        }
       
    }


    private page4Content = () => {
        if(this.state.page4score < 2) {
            return (
                <div>
                <div className = "page4Question">
                    <p>Score: {this.state.page4score}/4</p> 
                {this.QhtmlList()[this.state.page4index%3]}
                
                </div>
                </div>
            )
        } if(this.state.page4score < 4) {
            return (
                <div>
                <div className = "page4Question">
                    <p>Score: {this.state.page4score}/4</p> 
                {this.oeqlList()[this.state.page4index%2]}
                
                </div>
                </div>
            )
        } else {
            return (
                <div>
                     <div className = "page4Question">
                    <p>Score: {this.state.page4score}/4</p> 
                    <p><strong>Congratulations! You've completed the course!</strong></p>
                    </div>
                    
                </div>
            )
        }
       
    }

    private getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }

   

    public page0 = (
        <div>
            <h1 style={{marginBottom:"20px"}}>Welcome to the Compound Interests Lesson!</h1>
            <div className="authors">
                <p>Zijing Lu</p>
                <p>Jenny Song</p>
                <p>Liujing Ren</p>
            </div>
                <button 
                    onClick={this.goFirst}
                    className="btn btn-primary btn-block">
                    Start!
                </button>
           
        </div>
    )

    public page2 = (
        <div>
            <h3>Page 2: Learning Objective:</h3>
            <ul>
                <li>Recognize that with same interest rate, saving grow faster with compound interest than simple interest.</li>
            </ul>
            <p>Your friend Amy and you would like to invest some money into the bank to earn some interests. You both decide to put 1000 dollars initially. You choose to use simple interest(Red line). Your friend chooses to use complex interests(Blue line). The bank showed you guys a graph on how your total savings will change in 10 years with the same initial investment and same interest rate. Explore the graph and find out who will gain more money.</p>
        </div>
    )

    public page1 = (
        <div>
            <h3>Page 1: Learning Objective:</h3>
            <ul>
                <li>Explain the difference between compound interest and simple interest</li>
            </ul>
        </div>
    )

    public page3 = () => (
        <div>
            <h3>Page 3: Learning Objective:</h3>
            <ul>
                <li>Calculate the compound and simple interest.</li>
                <li>Apply the formula to context-based problems.</li>
            </ul>
            <p>Now you and Amy are wondering how to calculate the total savings for simple and compound interets. With the annual interest rates being 4%, follow the instruction below and try to input the values to find out. Be sure to clcik submit and check the graph below to see how your input value and correct value look like in the graph.</p>

            <div className="page3content">
            
            <button 
                className="btn btn-success btn-sm page3buttonleft float-sm-left"
                onClick={this.page3GoBack}
                disabled={this.state.page3index === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
            </button>

            <div>
            {this.page3Content()}
            </div>
       
            
            <button 
                className="btn btn-success page3buttonright float-sm-right"
                onClick={this.page3GoForward}
                disabled={this.state.page3index === 5}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0  0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
            </button>
    
            </div>
            </div>
    )

    public page4 = () => (
        <div>
            <h3>Page 4: Learning Objective:</h3>
            <ul>
                <li>Calculate the compound and simple interest.</li>
                <li>Apply the formula to context-based problems.</li>
            </ul>
            <div>
                {this.page4Content()}
            </div>
            <div className="page4morespace">test</div>
       
        </div>
  
    )

    private pageContent = (): any => {
        
        if(this.state.currPage === 0) {
            return this.page0
        }
        if(this.state.currPage === 1) {
            return this.page1
        }
        if(this.state.currPage === 2) {
            return this.page2
        }
        if(this.state.currPage === 3) {
            return this.page3()
        }
        if(this.state.currPage === 4) {
            return this.page4()
        }
      }
    
   
    
    
    
    private goNext = (): void => {
        // this.setState({ currPage: this.state.currPage + 1 })
        let newPage:number = this.state.currPage + 1
        this.setState(
            { currPage: newPage,
              page3index: 0, },
        )
        if(newPage === 3) {
            Streamlit.setComponentValue(
                {...this.state,
                    currPage: newPage,
                    page3index: 0,
                });
        } else {
            Streamlit.setComponentValue({"currPage": newPage});
        }
        
    }
    private goPrev = (): void => {
        // this.setState({ currPage: this.state.currPage - 1 })
        let newPage:number = this.state.currPage - 1
        this.setState(
            { currPage: newPage,
              page3index: 0, },
        )
        if(newPage === 3) {
            Streamlit.setComponentValue(
                {...this.state,
                    currPage: newPage,
                    page3index: 0,
                });
        } else {
            Streamlit.setComponentValue({"currPage": newPage});
        }
    }

    
    
  
   
  }
  
  export default withStreamlitConnection(CompoundInterest)
  