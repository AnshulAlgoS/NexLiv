
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

export type UserRole = 'seeker' | 'owner' | null;

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  userLoggedIn: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        
        if (db) {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setUserRole(userData.role);
        } else {
            setUserRole(null);
        }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

      } else {
        setCurrentUser(null);
        setUserRole(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserRole = async (role: UserRole) => {
    if (!currentUser || !db) return;
    
    const userDocRef = doc(db, "users", currentUser.uid);
    
    try {
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            await updateDoc(userDocRef, { role });
        } else {
            await setDoc(userDocRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                role: role,
                createdAt: new Date().toISOString()
            });
        }
        setUserRole(role);
    } catch (error) {
        console.error("Error updating user role:", error);
        throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
        alert("Firebase is not configured. Please check src/lib/firebase.ts");
        return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
        alert("Firebase is not configured. Please check src/lib/firebase.ts");
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with Email", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) {
        alert("Firebase is not configured. Please check src/lib/firebase.ts");
        return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up with Email", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      setUserRole(null);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const value = {
    currentUser,
    userRole,
    userLoggedIn,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
